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
	
	final int TIME_GOAL = 12; // ����������� ����. 
	ClockSync(int[] clock) {
		//�񱳸� �����ϱ� ����.. 12 �� 0���� ��������.
		for(int i=0; i<clock.length; ++i) {
			clock[i] = clock[i]%TIME_GOAL;
			
			//�Ʒ��� ����ϱ� ���� �ܼ� �ʱ�ȭ
			this._switchesOfClock.add(i, new ArrayList<Integer>());
		}
		this._clock = clock;
		
		// switch�� timer ��ȣ�� �׷�ȭ
		for(int switchNum=0; switchNum<this._switches.length; ++switchNum) {
			int[] aSwitch = this._switches[switchNum];
			for(int j=0; j<aSwitch.length; ++j) {
				int clockIndex = aSwitch[j];
				this._switchesOfClock.get(clockIndex).add(switchNum);
			}
		}
	}
	
	final int INC_TIME = 3; // ��������.
	public int[] pressSwitch(int switchNum, int[] cloneClock) {
		int[] aSwitch = this._switches[switchNum];
		for(int i=0; i<aSwitch.length; ++i) {
			int timerIndex = aSwitch[i];
			cloneClock[timerIndex] = (cloneClock[timerIndex]+INC_TIME) % TIME_GOAL;
		}
		return cloneClock;
	}
	
	public int solve() {
		// 1���� �����ϴ� ���� ������ �̸� ������. �׷��� ���̿� ����ġ ��츦 ����.
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
				//�ð迡 ���ؼ� ����� �� �ִ� ����ġ�� �ϳ��ΰ�츸
				
//				System.out.println("clock " + clockIndex);
//				for(int i : usableSwitches) {
//					System.out.print(i + " ");
//				}
//				System.out.println();
//				
				if(usableSwitches.size() == 1) {
					int usableSwitch = usableSwitches.get(0);
					//switch ����. time�� 0�̵ɶ���������
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
		// �غ�ܰ�.
		List<int[]> visted = new ArrayList<int[]>();
		Queue<AB> queue =  new LinkedList<AB>();
		queue.add(new AB(0, rootTimer));
		
		//�����۾�.
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
			visted.add(curClock); //�湮üũ.
			
			List<Integer> clocksToChange = this._getClocksToChangeBy(curClock);
			// ��������
			if(clocksToChange.isEmpty()) { 	finded = true; continue;	};			
			
			//�ڽ� Ȯ��.
			List<Integer> usableSwitches = this._getUsableSwitches(clocksToChange);
			if(usableSwitches.isEmpty()) return -1; // ����� �� �ִ� ����ġ���������.
			
			for(Integer switchIndex : usableSwitches) {
				
				int[] childTimer = this.pressSwitch(switchIndex, curClock.clone());
				if(this.isVisited(childTimer, visted)) {continue;}
				queue.add(new AB(curDeep+1,childTimer));
			}
		};
		
		return deep;
	}
	
	//��ȭ�ؾ��ϴ� �ð��� ���� �ð迡 ���� ��� ����ġ�� ����(�ߺ�����) 
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
				//�ϳ��� �ٸ��ٸ� �湮�Ѱ��� �ƴϾ�.
				if(vistedClock[i] != curClock[i]) {isVisited=false;break;}
			}
			if(isVisited) { 
//				System.out.println("------------�湮�ߴ�.");
				return true;
			}
		}
		
		// �湮�Ѱ��̾���.
		return false;
	}
}
