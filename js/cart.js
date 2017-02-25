/**
 * Created by ggaoli on 17/02/24.
 */
var vm=new Vue({
	el:'#app',
	data:{
		showModal:false,
		productList:[],
		totalMoney:0,
		checkAll:false,
		currentProduct:''
	},
	mounted:function () {
		this.$nextTick(function () {
			this.carView();
		});
	},
	filters: {
		formatMoney: function (value,quentity) {
			if(!quentity) quentity=1;
			return "¥ "+(value*quentity).toFixed(2) +"元";
		}
	},
	methods:{
		carView:function () {
			// var _this=this;
			// this.$http.get('data/cartData.json',{"id":235}).then(function (res) {
			// 	_this.productList=res.body.result.list;
			// 	_this.totalMoney=res.body.result.totalMoney;
			// })
			 /*箭头函数使作用域指向了外层*/
			this.$http.get('data/cartData.json',{"id":235}).then(res=>{
				this.productList=res.body.result.list;
				this.calcTotalMoney();
			})
		},
		changeMoney:function (item ,way) {
			if(way>0){
				item.productQuentity++;
			}else{
				item.productQuentity--;
				if(item.productQuentity<1){
					item.productQuentity=1;
				}
			}
			this.calcTotalMoney();
		},
		selectedProduct:function (item) {
			if(typeof item.checked=='undefined'){
				Vue.set(item,"checked",true);
				// this.$set(item,"checked",true);
			}else{
				item.checked=!item.checked;
			}
			this.calcTotalMoney();
			this.isCheckAll();
		},
		isCheckAll: function () {
			let flag = true;
			this.productList.forEach(function (item) {
				if(!item.checked){
					flag = false;
				}
			});
			this.checkAll = !!flag;
		},
		calcTotalMoney: function () {
			let totalMoney = 0;
			this.productList.forEach(function (item) {
				if(item.checked){
					totalMoney+=item.productPrice*item.productQuentity;
				}
			});
			this.totalMoney = totalMoney;
		},
		selectAll:function (isCheck) {
			this.checkAll=isCheck;
			this.productList.forEach(function (item) {
				if(typeof item.checked == "undefined"){
					Vue.set(item,"checked",isCheck);
				}else{
					item.checked = isCheck;
				}
			});
			this.calcTotalMoney();
		},
		delConfirm: function (product) {
			this.showModal = true;
			this.currentProduct = product;
		},
		delCurrentProduct: function () {
			this.showModal = false;
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index,1);
		}
	}
});
Vue.filter("money",function (value, type) {
	return "￥"+value.toFixed(2)+type;
});