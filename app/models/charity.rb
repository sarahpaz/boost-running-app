class Charity < ApplicationRecord

  has_many :runs
  has_many :users, through: :runs
  validates :name, presence: true, uniqueness: true
  validates :description, presence: true

  scope :alpha_order, -> { order(:name) }
  scope :top_three, -> { group(:name).order('distance DESC').limit(3) }
  
end


