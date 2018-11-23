
# TODO

1. with ForkJoinPool
        ForkJoinPool pool = null;
        try {
	        pool = new ForkJoinPool(8);
	        ForkJoinTask<?> submit = pool.submit(() -> {
	        	IntStream
	    			.range(0, listCnt)
	    			.parallel()
	    			.forEach(index -> {
	    				logger.info(Thread.currentThread().getName() + ", index=" + index + ", " + new Date());

						// action

	    			});
	        });

	        // wait
	        submit.get();

	    } catch (InterruptedException | ExecutionException e) {
	        e.printStackTrace();
	    } finally {
	        if (pool != null) {
	        	pool.shutdown(); //always remember to shutdown the pool
	        }
	    }
