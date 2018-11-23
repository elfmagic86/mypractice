

# TODO


1. 

// NOTE: 같은 세션 사용해야함
// TODO 

    @Autowired
    @Qualifier("sqlSessionFactory")
    private SqlSessionFactory sqlSessionFactory;

    int batchSize = 30;
    int listCnt = 1;
    int lastIndex = list.size() - 1;
    try (SqlSession sqlSession = csSqlSessionFactoryMaster.openSession(ExecutorType.BATCH)) {
      MapperDao mapperDao = sqlSession.getMapper(MapperDao.class);

      for (int i = 0; i < list.size(); i++) {
            Item item = list.get(i);
            // do 
            mapperDao.insert(list);

        		if ( i % batchSize == 0 || i == lastIndex ) {
        			sqlSession.flushStatements();
        			sqlSession.clearCache();
        		}
      }
    } catch(Exception ex) {
      logger.debug("error: {}", ex);
    }
