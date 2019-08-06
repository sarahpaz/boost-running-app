class UsersController < ApplicationController

  def show
    @user = User.find_by(id: params[:id])
    redirect_to user_path(current_user) if !@user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user.id)
    else
      render :new
    end
  end

  def mostdistance
    @user = User.most_distance
  end

  private
  
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
