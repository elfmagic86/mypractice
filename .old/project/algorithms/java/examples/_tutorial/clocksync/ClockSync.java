package _tutorial.clocksync;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class ClockSync {
	
	int[][] _switches = {
					     {0, 1, 2}
					    ,{3, 7, 9, 11}
						,{4, 10, 14, 15}
						,{0, 4, 5, 6, 7}
						,{6, 7, 8, 10, 12}
						,{0, 2, 14, 15}
						,{3, 14, 15}
						,{4, 5, 7, 14, 15}
						,{1, 2, 3, 4, 5}
						,{3, 4, 5, 9, 13}
					  };
	
	int[] _clock;
	List<List<Integer>> _switchesOfClock = new ArrayList<List<Integer>>();
	List<Integer> 		_removedSwitches = new ArrayList<Integer>();
	
	final int TIME_GOAL = 12; // 나머지계산할 기준. 
	ClockSync(int[] clock) {
		//비교를 쉽게하기 위해.. 12 는 0으로 맞춰주자.
		for(int i=0; i<clock.length; ++i) {
			clock[i] = clock[i]%TIME_GOAL;
			
			//아래서 사용하기 위해 단순 초기화
			this._switchesOfClock.add(i, new ArrayList<Integer>());
		}
		this._clock = clock;
		
		// switch를 timer 번호로 그룹화
		for(int switchNum=0; switchNum<this._switches.length; ++switchNum) {
			int[] aSwitch = this._switches[switchNum];
			for(int j=0; j<aSwitch.length; ++j) {
				int clockIndex = aSwitch[j];
				this._switchesOfClock.get(clockIndex).add(switchNum);
			}
		}
	}
	
	final int INC_TIME = 3; // 증가기준.
	public int[] pressSwitch(int switchNum, int[] cloneClock) {
		int[] aSwitch = this._switches[switchNum];
		for(int i=0; i<aSwitch.length; ++i) {
			int timerIndex = aSwitch[i];
			cloneClock[timerIndex] = (cloneClock[timerIndex]+INC_TIME) % TIME_GOAL;
		}
		return cloneClock;
	}
	
	public int solve() {
		// 1개에 의존하는 것은 있으면 미리 누른다. 그래서 깊이와 스위치 경우를 줄임.
		int oneSwitchPressCount = this._oneSwitchPress(); //side effect
		
		int pressSwitchCount 	= bfs(this._clock);
		
		if(pressSwitchCount < 0) return -1;
		else return pressSwitchCount + oneSwitchPressCount;  
	}
	
	private int _oneSwitchPress() {
		int oneSwitchPressCount   = 0;
		
		boolean befindOneSwitch = true;
		
		while(befindOneSwitch) {
			befindOneSwitch = false;
			
			for(int clockIndex = 0; clockIndex < this._switchesOfClock.size(); ++clockIndex) {
				
				List<Integer> usableSwitches = this._getUsableSwitches(clockIndex);
				//시계에 대해서 사용할 수 있는 스위치가 하나인경우만
				
//				System.out.println("clock " + clockIndex);
//				for(int i : usableSwitches) {
//					System.out.print(i + " ");
//				}
//				System.out.println();
//				
				if(usableSwitches.size() == 1) {
					int usableSwitch = usableSwitches.get(0);
					//switch 눌러. time이 0이될때까지눌러
					while(!this._isGoalTime(this._clock[clockIndex])) {
						this.pressSwitch(usableSwitch, this._clock);
						oneSwitchPressCount += 1;
					}
					this._removedSwitches.add(usableSwitch);
					befindOneSwitch = true;
				}
			}
			
		}
		return oneSwitchPressCount;
	}

	private List<Integer> _getUsableSwitches(int clock) {
		List<Integer> switches 		 = this._switchesOfClock.get(clock);
		List<Integer> usableSwitches = new ArrayList<Integer>();
		for(Integer switchIndex : switches) {
			if(!this._removedSwitches.contains(switchIndex)) { usableSwitches.add(switchIndex);}	
		}
		return usableSwitches;
	}

	private boolean _isGoalTime(int time) {
		if(time == 0 || time == TIME_GOAL) return true;
		else return false;
	}

	class AB<A,B> {
		public A a; public B b;
		AB(A _a, B _b) {a=_a; b=_b;}
	}
	private int bfs(int[] rootTimer) {
		// 준비단계.
		List<int[]> visted = new ArrayList<int[]>();
		Queue<AB> queue =  new LinkedList<AB>();
		queue.add(new AB(0, rootTimer));
		
		//실제작업.
		int deep = -1;
		boolean finded = false;
		while(!finded && !queue.isEmpty()) {
			AB ab 	       = queue.poll();
			int curDeep    = deep = (int) ab.a;
			int[] curClock = (int[]) ab.b;
					
//			for(int v : curClock) {
//				System.out.print(v + " ");
//			}
//			System.out.println(" deep " +curDeep + " q "+ queue.size());
			
			if(this.isVisited(curClock, visted)) {continue;}
			visted.add(curClock); //방문체크.
			
			List<Integer> clocksToChange = this._getClocksToChangeBy(curClock);
			// 종료조건
			if(clocksToChange.isEmpty()) { 	finded = true; continue;	};			
			
			//자식 확인.
			List<Integer> usableSwitches = this._getUsableSwitches(clocksToChange);
			if(usableSwitches.isEmpty()) return -1; // 사용할 수 있는 스위치가없을경우.
			
			for(Integer switchIndex : usableSwitches) {
				
				int[] childTimer = this.pressSwitch(switchIndex, curClock.clone());
				if(this.isVisited(childTimer, visted)) {continue;}
				queue.add(new AB(curDeep+1,childTimer));
			}
		};
		
		return deep;
	}
	
	//변화해야하는 시간을 가진 시계에 대해 모든 스위치를 모음(중복없이) 
	private List<Integer> _getUsableSwitches(List<Integer> clocksToChange) {
		List<Integer> allSwitches = new ArrayList<Integer>();
		for(Integer clockToChange : clocksToChange) {
			List<Integer> usableSwitches = this._getUsableSwitches(clockToChange);
			for(Integer switchIndex : usableSwitches) {
				if(allSwitches.contains(switchIndex)) continue;
				allSwitches.add(switchIndex);
			}
		}
		return allSwitches;
	}
	private List<Integer> _getClocksToChangeBy(int[] curTimer) {
		List<Integer> clocks = new ArrayList<Integer>();
		for(Integer i = 0; i<curTimer.length; ++i) {
			if(curTimer[i] != 0) clocks.add(i);
		}
		return clocks;
	}
	private boolean isVisited(int[] curClock, List<int[]> visted) {
		if(visted.isEmpty()) return false;
		
		for(int[] vistedClock : visted) {
			boolean isVisited = true;
			for(int i = 0; i< vistedClock.length; ++i) {
				//하나라도 다르다면 방문한것이 아니야.
				if(vistedClock[i] != curClock[i]) {isVisited=false;break;}
			}
			if(isVisited) { 
//				System.out.println("------------방문했다.");
				return true;
			}
		}
		
		// 방문한것이없다.
		return false;
	}
}
