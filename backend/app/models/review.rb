class Review < ApplicationRecord

    # belongs_to :user
    # belongs_to :game

    has_many :likes
    has_many :users, through: :likes
    belongs_to :game

    validates :rating, numericality: { only_integer: true } 
    validates :rating, numericality: { :greater_than_or_equal_to => 0 }
    validates :rating, numericality: { :less_than_or_equal_to => 100 }
    validates :content, presence: true

end
