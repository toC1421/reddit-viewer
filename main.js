function getJsonURL(relative_path){
  var prefix = "https://www.reddit.com";
  var suffix = ".json";
  return prefix + relative_path + suffix;
}

var app = new Vue({
  el: '#reddit',
  data: {
    subreddit: "worldnews",
    submissions: [],
    errorMessage: ""
  },
  mounted: function(){
    this.loadSubreddit(this.subreddit);
  },
  methods: {
    loadSubreddit: function(subreddit){
      var self = this;
      $.ajax({
        url: "https://www.reddit.com/r/" + subreddit + ".json",
        dataType: "json",
        method: "GET",
        success: function(data){
          self.errorMessage = "";
          var jsonData = data.data.children;
          self.submissions = [];
          for(var i = 0;i < jsonData.length; i++){
            var post = {};
            post.title = jsonData[i].data.title;
            post.url = jsonData[i].data.url;
            self.submissions.push(post);
          }
        },
        error: function(error){
          console.log(JSON.stringify(error));
          self.errorMessage = "Please enter a valid subreddit.";
        }
      });
    }
  }
});

var menubar = new Vue({
  el: '#menubar',
  data: {
    subreddits: [
      { title: "worldnews" },
      { title: "japan" },
      { title: "vuejs" }
    ],
    subreddit: ""
  },
  methods: {
    addSubreddit: function(){
      this.subreddits.push({title: this.inputText});
    },
    load: function(subreddit){
      app.loadSubreddit(subreddit.title);
    }
  }
});
