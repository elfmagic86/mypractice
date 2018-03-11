package com.practice.examples;

import io.reactivex.Observable;

public class P_90 {
	public static void main(String[] args) {
		System.out.printf("hi");
		hello("hi");
	}


    public static void hello(String ...names) {
		Observable.fromArray(names).subscribe((v) -> System.out.println(v));
    }
}
