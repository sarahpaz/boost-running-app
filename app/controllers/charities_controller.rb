class CharitiesController < ApplicationController

  def show
    @charity = Charity.find_by(id: params[:id])
		redirect_to charities_path if !@charity
		respond_to do |format|
			format.html
			format.json { render json: @charity}
		end
  end

  def index
		@charities = Charity.alpha_order 
		respond_to do |format|
			format.html
			format.json { render json: @charities}
		end
  end

  def new
    @charity = Charity.new
  end

  def create
    @charity = Charity.new(charity_params) 
    if @charity.save
			# redirect_to charity_path(@charity.id) 
			render json: @charity
    else
			render :new
    end
	end

  private

  def charity_params
    params.require(:charity).permit(:name, :description)
  end
  
end
