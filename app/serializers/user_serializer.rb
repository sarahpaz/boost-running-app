class UserSerializer < ActiveModel::Serializer
	attributes :id, :username, :email
	
	has_many :runs
  has_many :charities, through: :runs
end
