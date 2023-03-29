# SymphoMeet [![Netlify Status](https://api.netlify.com/api/v1/badges/ed44c0ac-64e8-42a4-b923-f44a6f2f0651/deploy-status)](https://app.netlify.com/sites/symphomeet/deploys)

## About the User
- The ideal user for this application is a classical musician looking to either advertise or join events to meet more players in their local community.
- This app provides a pressure free space for musicians of any calliber to search other local musicians, and also find "Ads" that may include music or chamber arrangements that interest the user.
## Features
- When a user logs in, they are prompted to create their member profile, which saves to the Firebase database and displays on their Musician profile.
- A user can CRUD on Ads with their names, descriptions, chamber preference, and choose to make their ad public yet or not.
- Users can view other musicians' ads under their profile but cannot edit or delete them.
- If a user decides to remove their account from the app, they will be directed back to the Musician Form.
## Video Walkthrough of SymphoMeet

## Relevant Links
- [Netlify](https://symphomeet.netlify.app/)
- [WireFrame](https://jamboard.google.com/d/1Ien29lypuedUkahPmIh9t2kwJ2AQEUZZEKfk5UJrga8/viewer?f=0)
- [Project Board](https://github.com/users/EvgBre/projects/1/views/1)
- [ERD](https://dbdiagram.io/d/63ead9ca296d97641d80a8b7)
## Code Snippet
```
export default function ShowMusicians() {
  const [musicians, setMusicians] = useState([]);

  const getAllMusicians = () => {
    getMusicians().then(setMusicians);
  };

  useEffect(() => {
    getAllMusicians();
  }, []);

  return (
    <div className="text-center my-4">
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
        {musicians.map((musician) => (
          <MusicianCard key={musician.firebaseKey} musicianObj={musician} onUpdate={getAllMusicians} />
        ))}
      </div>
    </div>
  );
}
```

## Project Screenshots <!-- These can be inside of your project. Look at the repos from class and see how the images are included in the readme -->

## Contributors
- [Evan Breland](https://github.com/EvgBre)