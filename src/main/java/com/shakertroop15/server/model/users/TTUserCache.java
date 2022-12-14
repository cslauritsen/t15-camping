package com.shakertroop15.server.model.users;

import com.google.common.cache.LoadingCache;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Supplier;


@Log4j2
public class TTUserCache {
//    public enum CacheType {
//        USERS,
//        TOKEN
//    }
//
//    private static TTUserCache instance;
//    private static final Object lock = new Object();
////    private final LoadingCache<String, UsersResponse> cache;
//    private final Map<CacheType, UsersResponse> map;
//    private final AtomicLong lastUpdate = new AtomicLong(0);    // last time the cache was updated
////    private final Supplier<UsersResponse> supplier;
//
//    private TTUserCache() {
//        map = new ConcurrentHashMap<>();
////        cache = CacheBuilder.newBuilder()
////                .maximumSize(1)
////                .build(new CacheLoader<>() {
////                    @Override
////                    public UsersResponse load(String key) {
////                        return supplier.get();
////                    }
////                });
////        this.supplier = supplier;
//    }
//
//    public static TTUserCache getInstance() {
//        if (instance == null) {
//            synchronized (lock) {
//                if (instance == null) {
//                    instance = new TTUserCache();
//                }
//            }
//        }
//        return instance;
//    }
//
//    public UsersResponse get(CacheType key, Supplier<UsersResponse> supplier) {
//        if (System.currentTimeMillis() - lastUpdate.get() > 1000 * 60 * 60 * 2) {
//            log.info("Updating cache");
//            map.clear();
//            lastUpdate.set(-1);
//        }
//        return map.computeIfAbsent(key, k -> {
//                    log.info("Getting new cache for {}", key);
//                    lastUpdate.set(System.currentTimeMillis());
//                    return supplier.get();
//                }
//        );
//    }
}
