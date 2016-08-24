json.extract! @story, :id, :title, :description, :genre

json.authors @story.authors do |author|
  json.id author.id
  json.username author.username
  json.email author.email
end

json.sections @story.sections do |section|
  json.body section.body
  json.id section.id
  json.story_id section.story_id
  json.user_id section.user_id
  json.date section.created_at.strftime("%b. %d %Y")
  json.author section.author.username

end

json.hand @story.author_hand(current_user.id)
json.writer_id @story.author_id(current_user.id)
