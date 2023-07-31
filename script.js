
/*
Author Alay Kidane

*/
$(document).ready(function() {
    // GitHub Repositories search button click event
    $('#github-btn').click(function() {
      var username = $('#github-input').val();
      searchRepositories(username);
    });
  
    // GitHub Repositories search function
    function searchRepositories(username) {
      // Make AJAX request to GitHub API
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        method: 'GET',
        success: function(data) {
          displayRepositories(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }
  // Display GitHub repositories and profile
  function displayRepositories(repos) {
    var resultsDiv = $('#github-results');
    resultsDiv.empty();
  
    if (repos.length === 0) {
      resultsDiv.append('<p>No repositories found.</p>');
    } else {
      // Get the first repository owner's login
      var ownerLogin = repos[0].owner.login;
      
      // Create a profile section
      var profileDiv = $('<div class="profile"></div>');
      profileDiv.append('<h3>Profile</h3>');
      profileDiv.append('<p>Username: ' + ownerLogin + '</p>');
      profileDiv.append('<a href="https://github.com/' + ownerLogin + '">View Profile</a>');
  
      // Append profile section to the results div
      resultsDiv.append(profileDiv);
  
      // Create a repositories section
      var reposDiv = $('<div class="repositories"></div>');
      reposDiv.append('<h3>Repositories</h3>');
  
      // Loop through the repositories and display each repository
      repos.forEach(function(repo) {
        var repoDiv = $('<div class="repository"></div>');
        repoDiv.append('<h4>' + repo.name + '</h4>');
        repoDiv.append('<p>' + repo.description + '</p>');
        reposDiv.append(repoDiv);
      });
  
      // Append repositories section to the results div
      resultsDiv.append(reposDiv);
    }
  }
  
  });
  