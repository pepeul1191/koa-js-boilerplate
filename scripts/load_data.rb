require 'mongo'

def client
  Mongo::Client.new(['127.0.0.1:27017'], :database => 'chat_db')
end

def fill_states
  states_ids = []
  states = ['active', 'activation_pending', 'suspended', 'deleted', ]
  states_collection = client[:states]
  for state in states do
    doc = states_collection.insert_one({name: state})
    states_ids.push(doc.inserted_id)
  end
  return states_ids
end

def fill_users(states_ids)
  file_path = File.dirname(__FILE__) + './data/users_demo.txt'
  users = []
  File.open(file_path, 'r') do |f|
    f.each_line do |line|
      # obtener random state_id
      state_id = BSON::ObjectId.from_string(states_ids[rand(0..3)])
      line_array = line.split('::')
      users.push({
        user: line_array[0],
        pass: line_array[1],
        email: line_array[2].strip,
        profile_picture: 'default_user.png',
        state_id: state_id,
        systems: [],
      })
    end
  end
  users_collection = client[:users]
  users_collection.insert_many(users)
end

states_ids = fill_states()
fill_users(states_ids)
