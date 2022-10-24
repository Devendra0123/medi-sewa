export const allBlogsQuery = () => {
    const query = `*[_type == "blog"] | order(_createdAt desc){
      _id,
       title,
       description,
       slug,
         image{
          asset->{
            _id,
            url
          }
        },
        category,
        createdBy,
        creatorImage{
            asset->{
              _id,
              url
            }
          },
    }`;
  
    return query;
  };

  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "product" && name match '${searchTerm}*' || categories match '${searchTerm}*' || details match '${searchTerm}*']`;
    return query;
  };