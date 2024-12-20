// import './Sec3.css'
// import { useState } from 'react'
// import { useEffect } from 'react'
// function Sec3(){

//     const[vidios,setvidios]= useState([])
//     useEffect(()=>{
//         fetch("AIzaSyCPQCmdlUqzp62dHQMYBhbwSHVTGK1f_FM")
//         .then((response) => response.json())
//         .then((data)=>{
//             setvidios(data)
//         })
//     },[])

//     return(
//         <>
//         <div className="alltogether">
//             {vidios.map((i)=>(
//                 <div key={i.id} className="thumnail">
//                     <div className="bigimg">
//                         <img src={`https://youtubereact-server.onrender.com${i.image1}`} alt="" />
//                     </div>
//                     <div className="information">
//                         <div className="smallimage"><img src={`https://youtubereact-server.onrender.com${i.image2}`} alt="" /></div>
//                         <div className="info">
//                             <div className="info1">{i.txt1}</div>
//                             <div className="imgandtxt">{i.txt2} <img src={`https://youtubereact-server.onrender.com${i.image3}`} alt="" /></div>
//                             <div className="lasttxt">{i.txt3}</div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//         </>
//     )
// }
// export default Sec3


// import './Sec3.css';
// import { useState } from 'react';

// function Sec3() {
//     const [videos, setVideos] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedVideoId, setSelectedVideoId] = useState(null);

//     const API_KEY = 'AIzaSyCPQCmdlUqzp62dHQMYBhbwSHVTGK1f_FM'; // Replace with your API key
//     const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

//     // Fetch videos based on the search term
//     const fetchVideos = async (query) => {
//         try {
//             const response = await fetch(
//                 `${BASE_URL}?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`
//             );
//             const data = await response.json();
//             setVideos(data.items || []); // `items` contains the search results
//         } catch (error) {
//             console.error('Error fetching videos:', error);
//         }
//     };

//     // Handle search button click
//     const handleSearch = () => {
//         if (searchTerm.trim() !== '') {
//             fetchVideos(searchTerm);
//         }
//     };

//     // Handle video click to play
//     const handleVideoClick = (videoId) => {
//         setSelectedVideoId(videoId);
//     };

//     return (
//         <div className="sec3-container">
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     placeholder="Search videos..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>

//             <div className="alltogether">
//                 {selectedVideoId ? (
//                     // Video player for the selected video
//                     <div className="video-player">
//                         <iframe
//                             width="560"
//                             height="315"
//                             src={`https://www.youtube.com/embed/${selectedVideoId}`}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                             title="YouTube Video"
//                         ></iframe>
//                         <button onClick={() => setSelectedVideoId(null)}>Back to Results</button>
//                     </div>
//                 ) : (
//                     // Thumbnails for search results
//                     videos.map((video) => (
//                         <div
//                             key={video.id.videoId}
//                             className="thumbnail"
//                             onClick={() => handleVideoClick(video.id.videoId)}
//                         >
//                             <div className="bigimg">
//                                 <img
//                                     src={video.snippet.thumbnails.high.url}
//                                     alt={video.snippet.title}
//                                 />
//                             </div>
//                             <div className="information">
//                                 <div className="info1">{video.snippet.title}</div>
//                                 <div className="info2">{video.snippet.channelTitle}</div>
//                                 <div className="lasttxt">{video.snippet.description}</div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Sec3;
// export default Sec3;
// export default Sec3;
// export default Sec3;
// export default Sec3;
import Sec1 from './Sec1';
import Sec2 from './Sec2';
import './Sec3.css';
import { useState } from 'react';

function Sec3() {
    const [videos, setVideos] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [maxResults, setMaxResults] = useState(10);

    const API_KEY = 'AIzaSyCPQCmdlUqzp62dHQMYBhbwSHVTGK1f_FM';
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

    // Function to fetch videos from the server
    const fetchVideos = (query) => {
        fetch(`${BASE_URL}?part=snippet&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => {
                setVideos(data.items || []);
            })
            .catch((error) => {
                console.error('Error fetching videos:', error);
            });
    };

    // Function to change the maximum number of results
    const handleMaxResultsChange = () => {
        const input = prompt("Enter the number of videos to display:", maxResults);
        const newMaxResults = parseInt(input, 10);
        if (!isNaN(newMaxResults) && newMaxResults > 0) {
            setMaxResults(newMaxResults);
        } else {
            alert("Please enter a valid number greater than 0.");
        }
    };

    // Variable to store the video components
    const videoComponents = videos.map((video) => (
        <div
            key={video.id.videoId}
            className="thumbnail"
            onClick={() => setSelectedVideoId(video.id.videoId)}
        >
            <div className="bigimg">
                <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                />
            </div>
            <div className="information">
                <div className="info1">{video.snippet.title}</div>
                <div className="info2">{video.snippet.channelTitle}</div>
            </div>
        </div>
    ));

    return (
        <>
            <button onClick={handleMaxResultsChange} className="set-max-results-button">
                Set Number of Videos
            </button>
            <Sec2 onTopicSelect={fetchVideos} />
            <Sec1 onSearch={fetchVideos} />
            <div className="alltogether">
                {selectedVideoId ? (
                    <div className="video-player">
                        <iframe
                            width="100%"
                            height="400px"
                            src={`https://www.youtube.com/embed/${selectedVideoId}?rel=0&modestbranding=1&showinfo=0`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube Video"
                        ></iframe>
                        <button onClick={() => setSelectedVideoId(null)}>Back to Results</button>
                    </div>
                ) : (
                    videoComponents
                )}
            </div>
        </>
    );
}

export default Sec3;
