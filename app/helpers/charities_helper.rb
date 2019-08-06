module CharitiesHelper

  def top_runner
    if @charity.runs.present?
      User.total_charity_runs(@charity)
    else
      tag.p("No runs yet!")
    end
  end

  def runs_to_view
    if @charity.runs.present?
      link_to("View Runs", charity_runs_path(@charity), :class => 'boost-btn btn-primary btn-sm').html_safe
    end
  end
  
end

