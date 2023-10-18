import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserProvider';

function Wishlist() {
  const { user } = useUser();

  if(user)
  {
     return <UserWishList />
  }

  else{
    return <p>Please login</p>
  }

}

function UserWishList()  {
  const { user } = useUser();
  const [wishlistData, setWishlistData] = useState([]);
  const [detailedWishlist, setDetailedWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the wish list data
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await axios.get(`https://banana-binge2.vercel.app/api/wishlist?userId=${user._id}`);
        const data = response.data;
        setWishlistData(data);
        console.log("Feticking wish list working");
        console.log("data in watchlist js");
        console.log(data);
      } catch (error) {
        console.error('Error fetching wish list data:', error);
      }
    }

    fetchWishlist();
  }, [user]);

  // Fetch details for each TV show in the wish list
  useEffect(() => {
    async function fetchWishlistDetails() {
      try {
        const detailPromises = wishlistData.map(async (item) => {
          const data = {
            tvShowId: item.tvShowId,
            tvShowName: item.tvShowName,
          };
          const response = await axios.post(`https://banana-binge2.vercel.app/api/showDetails`, data);
          console.log(response.data.movieDB.name);
          return response.data;
          
        });

        const detailedData = await Promise.all(detailPromises);
        setDetailedWishlist(detailedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wish list details:', error);
        setLoading(false);
      }
    }

    if (wishlistData.length > 0) {
      fetchWishlistDetails(); // Fetch details only if there are items in the wish list
    }
  }, [wishlistData]);


  // Function to handle removal of a TV show from the wish list
  const handleRemoveFromWishlist = async (tvShowId) => {


    try {
      console.log(user._id);
      console.log(tvShowId)
      // Send a request to the server to remove the TV show from the wish list
      const response = await axios.post('https://banana-binge2.vercel.app/api/removeFromWishlist', {
        userId: user._id,
        tvShowId: tvShowId,
      });

      if (response.status === 200) {
        // TV show removed successfully, update the wish list
        setWishlistData(wishlistData.filter((item) => item.tvShowId !== tvShowId));
      }
    } catch (error) {
      console.error('Error removing TV show from wish list:', error);
    }
  };

  return (
    <div>
      <h1>My Wish List</h1>
      {loading ? (
        <p>Loading wish list data...</p>
      ) : (
        <ul>
          {detailedWishlist.map((item) => (
            <li key={item.movieDB.id}>
              {/* Render show details here */}
              <p>{item.movieDB.name}</p>
              <p>{item.movieDB.overview}</p>
              {/* Add more show details as needed */}
              <button onClick={() => handleRemoveFromWishlist(item.movieDB.id)}>Remove</button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;
