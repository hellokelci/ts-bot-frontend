import { useState, useEffect } from 'react';
import './css/App.css';
import { PostBox } from './components/PostBox';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
  const [data, setData] = useState<string>('Loading...'); 

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(db, POSTS_COLLECTION);
      const snapshot = await getDocs(postsCollectionRef);
      
      const fetchedPosts = snapshot.docs.map(doc => {
          const data = doc.data();
          
          const media = data.media_attachments && data.media_attachments.length > 0
            ? data.media_attachments[0]
            : null;

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
            setData(`Error reaching Cloud Run service: ${error.message}`);
        }
    };
    
    fetchPosts();
    fetchFlaskData();
    
  }, []);

  return (
    <div className="container-tsbot">
      <h1 className="text-align-center">YouTube-Mentions Dashboard</h1>
      
      <p className="text-align-center">The HTML response from the live service default route is:</p>
      <p className="service-response">
        {data}
      </p>
      
      <p className="text-align-center">Here are some pulled posts from the <a href='https://console.firebase.google.com/u/0/project/ts-bot-external-test/firestore/databases/-default-/data/~2Fdt_posts' target='_blank'>Firestore Database</a>:</p>
      
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
            <p className="text-align-center service-response">Loading posts from Firestore...</p>
        )}
      </div>
    </div>
  );
}

export default App;