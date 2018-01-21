
// deprecated   이방식이아닌가벼.
/***
 *   깊이+1 * 2개의 노드 수.   노드값은 순차적으로.
 *       0              // 깊이1은 1개
 *   1,         2       //(2-1) *2 
 * 3,4,5,6   ,7,8,9,10  //(3-1) *2
 * ... 58
 */
public class TreeSample {
	public static int[] makeTree(int deep) {
		int[] tree;
		
		int   nodeCount =0;
		int   prevCount =0;
		// 깊이에 맞는 node 수 계산
		for(int curDeep=1; curDeep<=deep; ++curDeep ) {
			int curCount = prevCount * ((curDeep-1)* 2);
			if(curCount == 0){ curCount = 1;};
			
			nodeCount += curCount;
			prevCount  = curCount;
		};		
		
		//
		tree = new int[nodeCount];
		for(int i=0; i<nodeCount; ++i) {
			tree[i] = i;
		}
		return tree;
	}
	public static void printAll(int[] tree) {
		System.out.println();
		for(int i=0; i<tree.length; ++i) {
			System.out.print(tree[i]);
			System.out.print(' ');
		}
		System.out.println();
	}

}
