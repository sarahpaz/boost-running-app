class RunSerializer < ActiveModel::Serializer
	attributes :id

	belongs_to :user
  belongs_to :charity
end
