new Vue({
    el: '.container',
    data: {
        limitNum:'3',
        addressList: []
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList: function () {
            this.$http.get('data/address.json').then(response=> {
                var res = response.data;
                if (res.status == "0") {
                    this.addressList = res.result;
                }
            })
        }
    }
});
