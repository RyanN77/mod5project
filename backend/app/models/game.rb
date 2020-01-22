class Game < ApplicationRecord

    has_many :reviews
    has_many :users, through: :reviews
    has_many :follows
    has_many :users, through: :follows
    
end
