import { useState, useEffect } from 'react';
import './css/App.css';
import { PostBox } from './components/PostBox';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { SearchBar } from './components/SearchBar';

interface PostBoxData {
    user_profile_icon: string;
    post_id: string;
    post_content: string;
    timestamp: Date | string; 
    post_url: string;
    user_handle: string;
    // img: string;    
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, 
};

const API_URL = "https://apify-service-1019478763982.us-central1.run.app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const POSTS_COLLECTION = "dt_posts"; 

function App() {

  const [posts, setPosts] = useState<PostBoxData[]>([]);
  const [allPosts, setAllPosts] = useState<PostBoxData[]>([]);
  const [data, setData] = useState<string>('Loading...'); 
  const [searchTerm, setSearchTerm] = useState(''); 

useEffect(() => {
    const fetchAllData = async () => {
      const fetchPosts = async () => {
        try {
          const postsCollectionRef = collection(db, POSTS_COLLECTION);
          const snapshot = await getDocs(postsCollectionRef);
          
          const fetchedPosts = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log("Processing Firestore document data:", data);
            
            const timestampValue = data.created_at?.toDate ? data.created_at.toDate() : new Date(data.created_at);

            return {
                user_profile_icon: data.account?.avatar || '',
                post_id: data.id || doc.id,
                post_content: data.content || data.spoiler_text || '',
                timestamp: timestampValue,
                post_url: data.url || 'http://localhost/',
                user_handle: data.account?.username || 'N/A',
                // img: (media?.type === 'video' ? media.preview_url : media?.url) || '',
            } as PostBoxData;
          });
          
          setPosts(fetchedPosts);
          setAllPosts(fetchedPosts);
        } catch (error) {

          console.error("Firestore Data Fetch or Mapping Error:", error);

        }
      };

      const fetchFlaskData = async () => {
        try {
          if (!API_URL) {
            setData("Error: FLASK URL has not configured.");
            return;
          }
          const response = await fetch(API_URL);
          const resultText = await response.text(); 
          setData(resultText);
        } catch (error) {

          const e = error as Error;
          setData(`Error reaching Cloud Run service: ${e.message}`);
        }
      };
      
      await Promise.allSettled([
        fetchPosts(),
        fetchFlaskData()
      ]);
    };
  
    fetchAllData();
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setPosts(allPosts);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    
    const filtered = allPosts.filter(post => 
      post.user_handle.toLowerCase().includes(lowerCaseSearch) ||
      post.post_content.toLowerCase().includes(lowerCaseSearch)
    );
    
    setPosts(filtered);
  }, [searchTerm, allPosts]);

  return (
    <div className="container-tsbot">
      <h1 className="text-align-center">YouTube-Mentions Dashboard</h1>
      
      <p className="text-align-center">The HTML response from the live service default route is:</p>
      <p className="service-response">
        {data}
      </p>
      
      <p className="text-align-center">Here are some pulled posts from the <a href='https://console.firebase.google.com/u/0/project/ts-bot-external-test/firestore/databases/-default-/data/~2Fdt_posts' target='_blank'>Firestore Database</a>:</p>
      <SearchBar onSearchChange={setSearchTerm} />
      
      <div>
        {posts.length > 0 ? (
            posts.map(post => (
                <PostBox 
                    key={post.post_id} 
                    user_profile_icon={post.user_profile_icon}
                    post_id={post.post_id}
                    post_content={post.post_content}
                    timestamp={post.timestamp}
                    post_url={post.post_url}
                    user_handle={post.user_handle}
                    // img={post.img}
                />
            ))
        ) : (
            <p className="text-align-center service-response">
              {allPosts.length === 0 ? "Loading posts from Firestore..." : "Sorry, there are no posts in the database which contain your keywords."}
            </p>
        )}
      </div>
    </div>
  );
}

export default App;