json.array! @stories do |story|
  json.id story.id
  json.title story.title
  json.description story.description
  json.genre story.genre
  json.authorNames story.author_names

end
