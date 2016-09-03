# == Schema Information
#
# Table name: writers
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  story_id   :integer          not null
#  hand       :string           default([]), is an Array
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Writer < ActiveRecord::Base
  belongs_to :user, #method_name
    primary_key: :id, #typically id
    foreign_key: :user_id, #column_name_id
    class_name: 'User' #class_name ex. (String)

  belongs_to :story, #method_name
    primary_key: :id, #typically id
    foreign_key: :story_id, #column_name_id
    class_name: 'Story' #class_name ex. (String)

  def redraw(cards)
    genre_words = {}
    genre_ids = []
    Word.where(genre_id: JSON.parse(self.hand[0])['genre_id']).each do |word|
      genre_ids.push(word.id)
      genre_words[word.id] = word
    end
    gen_len = genre_ids.length

    hand = self.hand
      .map{|card| JSON.parse(card)['id']}
      .reject{|card| cards.include?(card)}

    until hand.length == 5
      idx = rand(gen_len)
      if !hand.include?(genre_ids[idx])
        hand.push(genre_ids[idx])
      end
    end

    hand.map{|id| genre_words[id].to_json}
  end

end
