### query


```
db.users.aggregate([
  {
    $match: {
      $and: [
        {
          'user': 'Gerianna'
        },
        {
          'pass': 'kGV0RWjr'
        },
      ],
    },
  },
  {
    $lookup: {
      'from': 'states',
      'localField': 'state_id',
      'foreignField': '_id',
      'as': 'user_state'
    }
  },
  {  
    $unwind: '$user_state'
  },
  {   
    $project:{
      _id : 1,
      email : 1,
      user : 1,
      state : '$user_state.name',
    }
  }
]);
```

### result

Array


```
/* 1 */
{
    "_id" : ObjectId("5d3a08bf0f10e27b3462488d"),
    "user" : "Gerianna",
    "email" : "gbrabendern@va.gov",
    "state" : "active"
}

```
