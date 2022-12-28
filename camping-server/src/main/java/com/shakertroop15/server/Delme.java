package com.shakertroop15.server;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.OffsetDateTime;

public class Delme {
    public static void main(String[] args) throws Exception {
        var om = new ObjectMapper();
        var x = om.reader().readValue("2022-11-03T16:00:00.000-07:00", OffsetDateTime.class);
        System.out.println(x);
    }
}
