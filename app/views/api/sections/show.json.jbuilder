json.section do
  json.body @section.body
  json.id @section.id
  json.story_id @section.story_id
  json.user_id @section.user_id
  json.date @section.created_at.strftime("%b. %d %Y")
  json.author @section.author.username
  json.seen @section.seen
end
