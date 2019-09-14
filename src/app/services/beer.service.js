export class BeerService {
  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  all() {
    return this.$http.get('/api/beers');
  }

  get() {
    return this.$http.get('/api/beers' + id);
  }

  delete() {
    return this.$http.delete('/api/beers/' + id);
  }
}
