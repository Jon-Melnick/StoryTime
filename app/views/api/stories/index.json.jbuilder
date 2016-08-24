json.array! @stories do |story|
  json.id story.id
  json.title story.title
  json.description story.description
  json.genre do
    json.id story.genre.id
    json.genre_type story.genre.genre_type
  end
  json.authorNames story.author_names
  json.unseen story.unseen_sections(current_user.id)
end
