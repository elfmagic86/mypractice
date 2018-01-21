package _tutorial.tsp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Tsp {

	private final int ROOT = -1;
	
	private double[][]    				_wp;
	private List<Integer> 				_nodes;
	private Map<String, Double> 		_memo; //path... root- {a,b,c,d} , a- {b,c,d}
	
	public Tsp(double[][] wp) {
		this._wp    = wp;
		// Ã³À½...nodes
		this._memo  = new HashMap<String,Double>();
		this._nodes = new ArrayList<Integer>();
		for(Integer i = 0; i<wp.length; ++i) {
			this._nodes.add(i);
		}
	}
	
	public double solve() {
		return dfs(ROOT, this._getRestNodes(ROOT, this._nodes) ) ;
	}
	private List<Integer> _getRestNodes(int excludeNode, List<Integer> restNodes) {
		return restNodes.stream().filter((v)-> v != excludeNode )
						  		.collect(Collectors.toList());
	}

	private double dfs(int curNode, List<Integer> restNodes) {
		String curTspPath = this._getTspPath(curNode, restNodes); 
		if(this._memo.containsKey(curTspPath)) return this._memo.get(curTspPath);
		if(restNodes.size() == 1) return this._getWp(curNode, restNodes.get(0));
		
		double minValue = Double.POSITIVE_INFINITY;
		
		for(int childNode : restNodes) {
			double aDfsValue     = dfs(childNode, this._getRestNodes(childNode, restNodes));
			double minValueChild = this._getWp(curNode, childNode) + aDfsValue;
			
			if(minValue > minValueChild) minValue = minValueChild;
		}
		
		this._memo.put(curTspPath, minValue);
		return minValue;
	}
	private double _getWp(int fromIdx, int toIdx) {
		if(fromIdx == ROOT) return 0;
		else return this._wp[fromIdx][toIdx];
	}

	private String _getTspPath(int curNode, List<Integer> restNodes) {
		StringBuffer sf 		= new StringBuffer();
		sf.append(curNode);
		restNodes.forEach((node) -> sf.append(node));
		return sf.toString();
	}

	
}
