const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

// dummy data that will come from a DB usually
var topics = [
  {
    name: "Women Who Code Welcome",
    topic: "WWCode",
    id: "1",
    speakerId: "1",
  },
  {
    name: "The Making of a Mentor — Elevate Your Connections & Career by Helping Others",
    topic: "WWCode",
    id: "2",
    speakerId: "2",
  },
  {
    name: "Building More Inclusive Android Apps: Animation and Reduced Movement",
    topic: "Mobile",
    id: "3",
    speakerId: "3",
  },
  {
    name: "Secure but Accessible: Building Sites Your Users Can Actually Use",
    topic: "Web Accessibility",
    id: "4",
    speakerId: "4",
  },
  {
    name: "Customizing Your Continuous Integration and Continuous Delivery for Mobile",
    topic: "Mobile",
    id: "5",
    speakerId: "5",
  },
  {
    name: "Is a Dev Bootcamp Right for Me?",
    topic: "Mobile",
    id: "6",
    speakerId: "6",
  },
  {
    name: "13 Tips to Write Code Like a Swiftie",
    topic: "Swift iOS",
    id: "7",
    speakerId: "7",
  },
  {
    name: "How Can Software Developers Help Mitigate Climate Change?",
    topic: "Enviroment development",
    id: "8",
    speakerId: "8",
  },
  {
    name: "Guide to Efficient Development with Design Systems",
    topic: "Web",
    id: "9",
    speakerId: "9",
  },
  {
    name: "Mindfulness for Developers",
    topic: "WWCode",
    id: "10",
    speakerId: "10",
  },
  {
    name: "How to Get Out of Tutorial Hell and Build Something",
    topic: "Mobile",
    id: "11",
    speakerId: "11",
  },
  {
    name: "Promises Demystified: Simplifying Asynchronous JavaScript",
    topic: "Javascript",
    id: "12",
    speakerId: "12",
  },
  {
    name: "Journey Into FullStack Apps With GraphQL + React",
    topic: "Javascript",
    id: "13",
    speakerId: "13",
  },
  {
    name: "Hack Your Mobile Job Search",
    topic: "Professional Development",
    id: "14",
    speakerId: "14",
  },
  {
    name: "Senior? Staff? Principal? Understanding Engineering Levels and How to Advance Into Them",
    topic: "Professional Development",
    id: "15",
    speakerId: "15",
  },
  {
    name: "Easily Apply Custom Designs to Multiple SwiftUI Projects",
    topic: "Swift iOS",
    id: "16",
    speakerId: "16",
  },
  {
    name: "The Android Tests Guide to the Galaxy: From Unit to Snapshot",
    topic: "Mobile",
    id: "17",
    speakerId: "17",
  },
  {
    name: "Panel: Framework Face-Off - React vs. Angular vs. VueJS",
    topic: "Javascript",
    id: "18",
    speakerId: "18",
  },
  {
    name: "Closing Keynote",
    topic: "WWCode",
    id: "19",
    speakerId: "19",
  },
  {
    name: "Interactive Group Networking",
    topic: "WWCode",
    id: "20",
    speakerId: "21",
  },
];

var speakers = [
  {
    name: "Grecia Castaldi",
    occupation: "Director of Community",
    id: "1",
  },
  {
    name: "Sierra OBryan",
    occupation: "Software Engineer",
    id: "2",
  },
  {
    name: "Eeva-Jonna Panula",
    occupation: "Senior Android Developer",
    id: "3",
  },
  {
    name: "AmyJune Hineline",
    occupation: "Senior Community Manager ",
    id: "4",
  },
  {
    name: "Chloe McAree",
    occupation: "Senior Software Engineer",
    id: "5",
  },
  {
    name: "Cecelia Martinez",
    occupation: "Developer Advocate",
    id: "6",
  },
  {
    name: "Chris Belanger",
    occupation: "Head of Community",
    id: "7",
  },
  {
    name: "Mikaela Caron",
    occupation: "iOS Engineer",
    id: "8",
  },
  {
    name: "Beste Burcu Bayhan",
    occupation: "Frontend Engineer",
    id: "9",
  },
  {
    name: "Preeti Agarwal",
    occupation: "Technical Leader ",
    id: "10",
  },
  {
    name: "Brittani Harris",
    occupation: "Founder and Instructor",
    id: "11",
  },
  {
    name: "Kruti Saklecha",
    occupation: "Senior Software Engineer",
    id: "12",
  },
  {
    name: "Nancy Crandall",
    occupation: "Digital Dev Engineer III",
    id: "13",
  },
  {
    name: "Jennifer Bailey and Tim Condon",
    occupation: "Educators and Innovators",
    id: "14",
  },
  {
    name: "Ei-Nyung Choi",
    occupation: "Principal Engineer and Technical Advisor  ",
    id: "15",
  },
  { name: "Vui Nguyen", occupation: "iOS Engineer", id: "16" },
  {
    name: "Gema Socorro Rodriguez",
    occupation: "Senior Android Engineer",
    id: "17",
  },
  {
    name: "Luz de León",
    occupation: "Senior Engineer",
    id: "18",
  },
  {
    name: "Rashmi Muralidharan",
    occupation: "Leadership Fellows",
    id: "19",
  },
  {
    name: "Navati Jain",
    occupation: "Leadership Fellows",
    id: "20",
  },
  {
    name: "Stephanie Rideout",
    occupation: "Digital Community Specialist",
    id: "21",
  },
];
//Query Types
const topicType = new GraphQLObjectType({
  name: "Topic",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    topic: { type: GraphQLString },
    Speaker: {
      type: SpeakerType,
      //look for Speaker based on the parent ID = speakerId
      resolve(parent, args) {
        console.log(parent);
        return _.find(speakers, { id: parent.speakerId });
      },
    },
  }),
});
const SpeakerType = new GraphQLObjectType({
  name: "Speaker",
  // wrapped fields in a function to make this execute after the file has been ran
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    occupation: { type: GraphQLString },
    topics: {
      type: new GraphQLList(topicType),
      resolve(parent, args) {
        //filter through all the topics array based on speakerId
        return _.filter(topics, { speakerId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    Topic: {
      type: topicType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(topics, { id: args.id });
      },
    },
    Speaker: {
      type: SpeakerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(speakers, { id: args.id });
      },
    },
    topics: {
      type: new GraphQLList(topicType),
      resolve(parent, args) {
        return topics;
      },
    },
    speakers: {
      type: new GraphQLList(SpeakerType),
      resolve(parent, args) {
        return speakers;
      },
    },
  },
});
// Mutations
// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addSpeaker: {
//       type: SpeakerType,
//       args: {
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//       },
//       //Take argunments with Query to make a new instance of Speaker and store in DB
//       resolve() {
//         let Speaker = new Speaker({
//           name: args.name,
//           age: args.age,
//         });
//       },
//       //mongoose to save method to DB
//       // Speaker.save();
//     },
//   },
// });
module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutation,
});
