import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

function HomePage(props) {
  return <MeetupList meetups={props.meetups}/>;
}

// export async function getServerSideProps(context){

//   const req = context.req;
//   const res = context.res;
  
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://admin-farhan:1234@cluster0.iddhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };

}

export default HomePage;