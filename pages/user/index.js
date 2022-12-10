import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/users.services";
import { Skeleton, Typography } from "antd";

function index() {
  const { data, isLoading } = useQuery(["users"], () => getUsers(), {});
  return (
    <Skeleton loading={isLoading}>
      <p>{JSON.stringify(data)}</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore animi
        aut consectetur fugit autem suscipit quia eligendi enim, reiciendis
        architecto accusantium! Totam laudantium recusandae architecto illum
        asperiores culpa a eius.
      </p>

      <Typography.Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
        cumque quia quod accusantium dolores. Distinctio fuga architecto nulla
        ipsam aliquid debitis atque dicta harum. Ex nulla modi nemo impedit
        reprehenderit.
      </Typography.Text>
    </Skeleton>
  );
}

export default index;
