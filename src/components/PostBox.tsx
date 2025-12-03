import '../css/PostBox.css';

interface PostBoxProperties {
    user_profile_icon: string;
    post_id: string;
    post_content: string;
    timestamp: Date | string;
    post_url: string;
    user_handle: string;
    img?: string;
}

export function PostBox({
    user_profile_icon,
    post_id,
    post_content,
    timestamp,
    post_url,
    user_handle,
    // img,
}: PostBoxProperties) {

    let formattedTimestamp = '';
    try {
        const dateObj = (timestamp instanceof Date) ? timestamp : new Date(timestamp);
        formattedTimestamp = dateObj.toLocaleTimeString() + ' - ' + dateObj.toLocaleDateString();
    } catch {
        formattedTimestamp = 'Invalid Date';
    }

    return (
        <div className="container-post-content">
            <div className="left-column text-align-center margin-zero">
                {user_profile_icon && (
                    <img src={user_profile_icon} alt={`${user_handle}'s Icon`} />
                )}
            </div>
            <p className="row-top margin-zero">@{user_handle}</p>
            
            {/* {img && (
                <div className="post-media-wrapper">
                    <img src={img} alt="Post Media" className="post-media" />
                </div>
            )} */}
            
            {post_content ? (
                <p className="row-middle post-content margin-zero">{post_content}</p>
            ) : (
                <p className="row-middle post-content margin-zero">❌📺 Sorry, there's no textual content to display here. Please check the source to view the media directly.</p>
            )}

            <div className="row-bottom post-details margin-zero">
                <span>#{post_id}</span> • <span>{formattedTimestamp}</span> •&nbsp; 
                <a href={post_url.toString()} target="_blank" rel="noopener noreferrer">URL to Original Post</a>
            </div>
        </div>
    );
}