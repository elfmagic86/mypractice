package com.kang.myboard.domain;

public enum Gender {
	MAN(1), WOMAN(0);
	
	
	private final int value;
	Gender(int value)
	{
		this.value = value;
	}
	
	public int getValue()
	{
		return value;
	}
	
	public static Gender valueOf(int value)
	{
		switch(value) {
		case 1: return MAN;
		case 2: return WOMAN;
		default: throw new AssertionError("Unknown value : "+value);
		}
		
	}

}
