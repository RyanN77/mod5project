class FollowsController < ApplicationController

    def index 
        render ({json: Follow.all})
    end

    def show
        @user = User.find(params[:id])
        @follows = Follow.where(:user_id => @user)
        render ({json: @follows})
    end

    # def filter 
    #     @follows = Follows.where(:user_id => params[:id])
    # end

    def create 
        @follow = Follow.find_or_create_by(follow_params)
        render json: @follow, status: :created, location: @follow
    end

    def destroy
        @follow = Follow.find(params[:id])
        @follow.destroy
    end


    private
    def follow_params
        params.require(:follow).permit(:user_id, :game_id)
    end

end