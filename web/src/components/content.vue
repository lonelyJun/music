<template>
  <div class="content" v-loading="list.length ===0">
    <div class="add">
      <span class="search-t">
        <el-input sime="small" v-model="search" placeholder="请输入查询内容"></el-input>
      </span>
      <el-button type="primary" @click="searchT()">搜索</el-button>
      <el-button type="primary" @click="add()">添加专辑</el-button>
      <el-button type="primary" @click="eidtUser()">修改用户等级</el-button>
    </div>
    <div class="list">
      <div class="left-table" v-if="list.length > 0">
        <div class="thead-list">
          <span
            v-for="(item, index) in tHeadTitle"
            :key="index"
            :class="'th-' + item.prop"
          >{{item.name}}</span>
        </div>
        <div @click="seeSignList(ik)" v-for="(item_c, ik) in list" :key="ik" class="tbody-list">
          <span class="th-index">{{ik}}</span>
          <span
            v-for="(itemChild, index) in list_title"
            :key="index"
            :class="'th-' + itemChild.prop"
          >
            <template
              v-if="!itemChild.type"
            >{{formatTD(item_c[itemChild.prop], itemChild.propChild)}}</template>
            <el-image
              v-else-if="itemChild.type === 'img'"
              style="width: 100px; height: 100px"
              :src="item_c[itemChild.prop]"
              fit="contain"
            ></el-image>
          </span>
          <span class="th-handler">
            <el-button size="small" type="primary" icon="el-icon-edit" circle @click="edit(item_c)"></el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" circle @click="del(item_c)"></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-plus"
              circle
              @click="addSing(item_c)"
            ></el-button>
          </span>
        </div>
      </div>
      <div class="right-form" v-if="list.length > 0">
        <span v-for="(itemSee, index) in list_title" :key="index" class="see-l">
          <span class="see-l-name">{{itemSee.name}}</span>
          <span class="see-l-value">
            <template v-if="!itemSee.type">{{formatTD(seeValue[itemSee.prop], itemSee.propChild)}}</template>
            <el-image
              v-else-if="itemSee.type === 'img'"
              style="width: 100px; height: 100px"
              :src="seeValue[itemSee.prop]"
              fit="contain"
            ></el-image>
          </span>
        </span>
      </div>
    </div>
    <EditDialog
      v-if="isShow"
      :isShow.sync="isShow"
      :value="isValue"
      title="修改"
      :listData="list_title"
      :btnName="btnName"
    />
  </div>
</template>
<script>
import { list_title } from "./list_config.js";
import EditDialog from "./editDialog";
import { allAlb, setUserLevel } from "@/service/service.js";

export default {
  props: [],
  components: {
    EditDialog
  },
  data() {
    return {
      list_title,
      tHeadTitle: null,
      btnName: "",
      isShow: false,
      isValue: null,
      isWhichIndex: 0,
      search: "",
      list: []
    };
  },
  mounted() {
    this.tHeadTitle = JSON.parse(JSON.stringify(this.list_title));
    this.tHeadTitle.push({
      name: "操作",
      prop: "handler"
    });
    this.tHeadTitle.unshift({
      name: "序号",
      prop: "index"
    });
    this.getMusic();
  },
  computed: {
    seeValue() {
      return this.list[this.isWhichIndex];
    }
  },
  methods: {
    async assearchT() {
      const res = await setUserLevel({ level: 1, id: sessionStorage["info"] });
      console.log(res);
    },
    eidtUser() {
      this.$confirm("修改当前用户为超级管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setLevel();
        })
        .catch(() => {});
    },
    async setLevel() {
      const res = await setUserLevel({ level: 1, id: sessionStorage["info"] });
      this.$message.success("成功");
    },
    formatTD(s, prop) {
      if (s instanceof Array) {
        return s.map(d => d[prop]).join("， ");
      }
      return s;
    },
    edit(s) {
      this.isShow = true;
      this.btnName = "修 改";
      this.isValue = Object.assign({}, s);
    },
    addSing() {
      this.$prompt("请输入歌曲", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
        })
        .catch(() => {
         
        });
    },

    add() {
      this.isShow = true;
      this.btnName = "添 加";
      this.isValue = null;
    },
    del(s) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let y = this.list.findIndex(p => p.album_name === s.album_name);
          this.list.splice(y, 1);
        })
        .catch(() => {});
    },
    seeSignList(i) {
      this.isWhichIndex = i;
    },
    async getMusic() {
      const res = await allAlb();
      if (res.code === 0) {
        this.list = res.data;
      } else {
        this.$messgae.error("error");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  .add {
    margin-top: 2rem;
    height: 4rem;
    width: 70%;
    display: flex;
    justify-content: flex-end;
    .search-t {
      width: 20rem;
      height: 100%;
      margin-right: 2rem;
    }
  }
  .list {
    display: flex;
    .left-table {
      height: 100%;
      flex: 1;
      padding: 3rem;
      .thead-list,
      .tbody-list {
        height: 8rem;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.4rem;
        text-align: center;
        cursor: default;
      }
      .tbody-list {
        margin: 0.5rem 0;
        .th-cover {
          height: 100%;
        }
        > span {
          white-space: normal;
        }
      }
      .thead-list {
        background-color: #ccc;
        font-size: 1.6rem;
        height: 5rem;
      }
    }
    .right-form {
      width: 25%;
      height: 100%;
      border-left: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      padding: 10rem 2rem;
      .see-l {
        width: 100%;
        min-height: 5rem;
        font-size: 1.6rem;
        display: flex;
        .see-l-name {
          font-weight: bold;
          color: #1884fd;
          width: 10rem;
        }
        .see-l-value {
          flex: 1;
        }
        & /deep/ {
          .el-image:hover {
            transform: scale(6);
            position: relative;
            right: 20rem;
          }
        }
      }
    }
  }
}
.th-index {
  width: 5%;
}
.th-album_name {
  width: 15%;
}
.th-public_time {
  width: 15%;
}
.th-price {
  width: 15%;
}
.th-cover {
  width: 15%;
  overflow: hidden;
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
.th-singers {
  width: 20%;
}
.th-handler {
  width: 15%;
}
</style>