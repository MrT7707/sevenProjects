let timer

class FnTimeCountDown {
    constructor(d, obj){
        this.timer = null;
        this.d = d || Date.UTC(2050, 0, 1);
        this.o = obj;
        this.t = null;
        this.lt = null;
        this.z = this.zero.bind(this);
        this.v = this.dv.bind(this);
        this.u = this.ui.bind(this);
    }

	zero(n){
		n = parseInt(n, 10);
		if(n > 0){
			if(n <= 9){
				n = "0" + n;	
			}
			return String(n);
		}else{
			return "00";	
		}
	}

    clearClass(){      
        if(this.o.sec){
			this.o.sec.classList.remove('fas')
		}
		if(this.o.mini){
			this.o.mini.classList.remove('fas')
		}
		if(this.o.hour){
			this.o.hour.classList.remove('fas')
		}
		if(this.o.day){
			this.o.day.classList.remove('fas')
		}
		if(this.o.month){
			this.o.month.classList.remove('fas')
		}
		if(this.o.year){
			this.o.year.classList.remove('fas')
		}
    }

    addClass(t){      
        if(!this.lt){
            return
        }
        if(this.o.sec && this.lt.sec !== t.sec){
			this.o.sec.classList.add('fas')
		}
		if(this.o.mini && this.lt.mini !== t.mini){
			this.o.mini.classList.add('fas')
		}
		if(this.o.hour&& this.lt.hour !== t.hour){
			this.o.hour.classList.add('fas')
		}
		if(this.o.day&& this.lt.day !== t.day){
			this.o.day.classList.add('fas')
		}
		if(this.o.month&& this.lt.month !== t.month){
			this.o.month.classList.add('fas')
		}
		if(this.o.year&& this.lt.year !== t.year){
			this.o.year.classList.add('fas')
		}
    }

	dv(){
		let future = new Date(this.d), now = new Date();
		//现在将来秒差值  + future.getTimezoneOffset() * 60,
		let dur = Math.round((future.getTime() - now.getTime()) / 1000), pms = {
			sec: "00",
			mini: "00",
			hour: "00",
			day: "00",
			month: "00",
			year: "0"
		};
		if(dur > 0){
			pms.sec = this.z(dur % 60);
			pms.mini = Math.floor((dur / 60)) > 0? this.z(Math.floor((dur / 60)) % 60) : "00";
			pms.hour = Math.floor((dur / 3600)) > 0? this.z(Math.floor((dur / 3600)) % 24) : "00";
			pms.day = Math.floor((dur / 86400)) > 0? this.z(Math.floor((dur / 86400)) % 30) : "00";
			//月份，以实际平均每月秒数计算
			pms.month = Math.floor((dur / 2629744)) > 0? this.z(Math.floor((dur / 2629744)) % 12) : "00";
			//年份，按按回归年365天5时48分46秒算
			pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
		}
		return pms;
	}
	ui(){
        this.t = this.v();
        this.clearClass();
		if(this.o.sec){
			this.o.sec.innerHTML = this.t.sec;
		}
		if(this.o.mini){
			this.o.mini.innerHTML = this.t.mini;
		}
		if(this.o.hour){
			this.o.hour.innerHTML = this.t.hour;
		}
		if(this.o.day){
			this.o.day.innerHTML = this.t.day;
		}
		if(this.o.month){
			this.o.month.innerHTML = this.t.month;
		}
		if(this.o.year){
			this.o.year.innerHTML = this.t.year;
		}
        this.addClass(this.t)
        this.lt = this.t
		this.timer = setTimeout(this.u, 1000);
	}
    clear(){
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }
};	

const start = () => {
    var d = '';
    var obj = {
        sec: document.getElementById("sec"),
        mini: document.getElementById("mini"),
        hour: document.getElementById("hour")
    }
    timer = new FnTimeCountDown(d, obj);
    timer.ui();
}

start()
