
// deprecated   �̹���̾ƴѰ���.
/***
 *   ����+1 * 2���� ��� ��.   ��尪�� ����������.
 *       0              // ����1�� 1��
 *   1,         2       //(2-1) *2 
 * 3,4,5,6   ,7,8,9,10  //(3-1) *2
 * ... 58
 */
public class TreeSample {
	public static int[] makeTree(int deep) {
		int[] tree;
		
		int   nodeCount =0;
		int   prevCount =0;
		// ���̿� �´� node �� ���
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
