const creatordata = [
  {
    creator: "OP",
    topic: "programming",
    c_id: 1,
    questions: [
      {
        question: "how is a Javascript function?",
        options: [
          { option: "good", o_id: 111 },
          { option: "bad", o_id: 112 },
          { option: "very good", o_id: 113 },
          { option: "worst", o_id: 114 },
        ],
        correctanswerid: 114,
      },
      {
        question: "Who created the world?",
        options: [
          { option: "god", o_id: 121 },
          { option: "op", o_id: 122 },

          { option: "jaggi", o_id: 123 },

          { option: "anil", o_id: 124 },
        ],
        correctanswerid: 122,
      },
    ],
  },

  {
    creator: "Jaggi",
    topic: "sports",
    c_id: 2,
    Questions: [
      {
        question: "Who is Virat kohli?",
        options: [
          { option: "Footballer", o_id: 211 },
          { option: "basketballer", o_id: 212 },

          { option: "cricketer", o_id: 213 },
          { option: "hockyer", o_id: 214 },
        ],
        correctanswerid: 213,
      },
      {
        question: "Who is Saina nehwal?",
        options: [
          { option: "cricketer", o_id: 221 },
          { option: "footballer", o_id: 222 },
          { option: "tennis player", o_id: 223 },
          { option: "badminton player", o_id: 224 },
        ],
        correctanswerid: 224,
      },
    ],
  },
];

export default creatordata;
