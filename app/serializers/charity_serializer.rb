class CharitySerializer < ActiveModel::Serializer
	attributes :id, :name, :description
	
	has_many :runs
  has_many :users, through: :runs
end
