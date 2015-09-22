app.factory("TagFactory", () => {
  return {
    getTagsFromProjects: (projects) => {
      var tags = [];

      projects.forEach(project => {
        tags = _.union(tags, project.tags);
      });
      return tags;
    }
  }
});
