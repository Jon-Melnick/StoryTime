json.array! @genres do |genre|
  json.id genre.id
  json.genre genre.genre_type
end
