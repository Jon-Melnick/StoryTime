json.extract! @genre, :id, :genre_type

json.words @genre.words.order(:word)
