# == Schema Information
#
# Table name: writers
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  story_id   :integer          not null
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
    Word.where(genre_id: JSON.parse(self.hand[0])['genre_id']).each{|word| genre_words[word.id] = word}
    gen_len = genre_words.length

    hand = self.hand
      .map{|card| JSON.parse(card)['id']}
      .reject{|card| cards.include?(card)}

    until hand.length == 5
      idx = rand(gen_len)
      if !hand.include?(idx)
        hand.push(idx)
      end
    end

    hand.map{|idx| genre_words[idx].to_json}
  end

end
