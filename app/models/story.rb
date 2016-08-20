# == Schema Information
#
# Table name: stories
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :string
#  genre_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Story < ActiveRecord::Base
  validates :title, :genre_id, presence: true

  has_many :sections, #method_name, ends with s
  primary_key: :id, #typically id
  foreign_key: :story_id, #column_name_id
  class_name: 'Section' #class_name ex. (String)

  has_many :team_members, #method_name, ends with s
    primary_key: :id, #typically id
    foreign_key: :story_id, #column_name_id
    class_name: 'Writer' #class_name ex. (String)

  has_many :authors, #method name
    through: :team_members,
    source: :user

  has_one :genre, #method_name, ends with s
    primary_key: :genre_id, #typically id
    foreign_key: :id, #column_name_id
    class_name: 'Genre' #class_name ex. (String)

  def author_names
    authors = self.authors
    authors.map{|author| author.username}
  end

  def generate_hand
    hand = []
    genre_words = Word.where(genre_id: self.genre_id)
    words_length = genre_words.length
    until hand.length == 5
      num = rand(words_length)
      hand << num unless hand.include?(num)
    end

    hand.map{|idx| genre_words[idx].to_json}
  end

  def author_hand(id)
    hand = {}
    return if !team_members.map{|writer| writer.user_id}.include?(id)
    team_members.find_by(user_id: id, story_id: self.id).hand.each_with_index do |word, idx|
      word = JSON.parse(word)
      hand[idx] = word
    end
    hand
  end

  def author_id(id)
    team = team_members
    return if !team_members.map{|writer| writer.user_id}.include?(id)
    team_members.find_by(user_id: id).id
  end

end
