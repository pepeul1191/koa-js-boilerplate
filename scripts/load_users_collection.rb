require 'mongo'

# cambiar file_path a ruta absoluta de archivo data/users_demo.txt

file_path = '/home/pepe/Documentos/node/koapp/data/users_demo.txt'

documents = []

File.open(file_path, 'r') do |f|
  f.each_line do |line|
    line_array = line.split('::')
    documents.push({ 	
    	user: line_array[0],
    	pass: line_array[1],
    	email: line_array[2],
	})
  end
end

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'chat_db')
users_collection = client[:users]
users_collection.insert_many(documents)
