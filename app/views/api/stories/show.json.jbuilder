json.extract! @story, :id, :title, :description, :genre, :sections

json.authors @story.authors do |author|
  json.id author.id
  json.username author.username
  json.email author.email
  json.hand @story.author_hand(author.id)
end

json.hand @story.author_hand(current_user.id)
json.writer_id @story.team_members.find_by(user_id: current_user.id).id
