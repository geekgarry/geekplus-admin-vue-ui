<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="queryParams.roleName"
          placeholder="请输入角色名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入权限字符"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="角色状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <!-- <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          /> -->
          <el-option label="正常" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="roleList"
      @selection-change="handleSelectionChange"
      highlight-current-row
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="角色编号"
        prop="roleId"
        align="center"
        width="120"
      />
      <el-table-column
        label="角色名称"
        prop="roleName"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="权限字符"
        prop="roleKey"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="显示顺序"
        prop="roleSort"
        align="center"
        width="100"
      />
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ dateFormat(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        width="150"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-circle-check"
            @click="handleMenuDataScope(scope.row)"
            >菜单权限</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      hide-on-single-page
      :small="true"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number
            v-model="form.roleSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <!-- <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio> -->
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox
            v-model="menuExpand"
            @change="handleCheckedTreeExpand($event, 'roleOfMenu')"
            >展开/折叠</el-checkbox
          >
          <el-checkbox
            v-model="menuNodeAll"
            @change="handleCheckedTreeNodeAll($event, 'roleOfMenu')"
            >全选/全不选</el-checkbox
          >
          <el-checkbox
            v-model="menuCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'menu')"
            >父子联动</el-checkbox
          >
          <el-tree
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            ref="roleOfMenu"
            node-key="menuId"
            :check-strictly="!menuCheckStrictly"
            empty-text="加载中，请稍后"
            :default-checked-keys="menuSelectedOptions"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="openDataScope"
      width="500px"
      append-to-body
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="form.roleKey" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限范围">
          <el-select v-model="form.dataScope" @change="changeMenuDataScope">
            <el-option
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单权限" v-show="form.dataScope == 2">
          <el-checkbox
            v-model="menuExpand"
            @change="handleCheckedTreeExpand($event, 'menu')"
            >展开/折叠</el-checkbox
          >
          <el-checkbox
            v-model="menuNodeAll"
            @change="handleCheckedTreeNodeAll($event, 'menu')"
            >全选/全不选</el-checkbox
          >
          <el-checkbox
            v-model="menuCheckStrictly"
            @change="handleCheckedTreeConnect($event, 'menu')"
            >父子联动</el-checkbox
          >
          <el-tree
            class="tree-border"
            :data="menuOptions"
            show-checkbox
            default-expand-all
            ref="menu"
            node-key="menuId"
            :check-strictly="!menuCheckStrictly"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitMenuDataScope">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listRole, getRole, delRole, addRole, updateRole, changeRoleStatus, exportRole } from "@/api/system/role"; //exportRole, dataScope,
import {
  getMenuListByRoleId, listAllMenu, getAllMenuListTree, getAllMenuIdList, getMenuTreeSelectedByRoleId,
  addRoleMenus, batchAddRoleMenus, deleteRoleMenus, batchDeleteRoleMenus
} from "@/api/system/menu"
// import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/sys/menu";
// import { treeselect as deptTreeselect, roleDeptTreeselect } from "@/api/sys/dept";

export default {
  name: "RoleManage",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      menuExpand: false,
      menuNodeAll: false,
      // deptExpand: true,
      // deptNodeAll: false,
      menuCheckStrictly: false,
      // deptCheckStrictly: true,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定数据权限"
        },
        // {
        //   value: "3",
        //   label: "本部门数据权限"
        // },
        // {
        //   value: "4",
        //   label: "本部门及以下数据权限"
        // },
        // {
        //   value: "5",
        //   label: "仅本人数据权限"
        // }
      ],
      // 菜单列表
      menuOptions: [],
      menuSelectedOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined,
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "menuName"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {

  },
  created() {
    this.getList();
    // this.getDicts("sys_normal_disable").then(response => {
    //   this.statusOptions = response.data;
    // });
  },
  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.queryParams).then(
        response => {
          this.roleList = response.rows;
          // console.log(response)
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      getAllMenuListTree().then(response => {
        console.log(response)
        this.menuOptions = response.data;
      });
    },
    /** 查询部门树结构 */
    // getDeptTreeselect() {
    //   deptTreeselect().then(response => {
    //     this.deptOptions = response.data;
    //   });
    // },

    // 所有菜单节点数据
    getRoleOfMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.roleOfMenu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.roleOfMenu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },

    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 所有部门节点数据
    // getDeptAllCheckedKeys() {
    //   // 目前被选中的部门节点
    //   let checkedKeys = this.$refs.dept.getCheckedKeys();
    //   // 半选中的部门节点
    //   let halfCheckedKeys = this.$refs.dept.getHalfCheckedKeys();
    //   checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
    //   return checkedKeys;
    // },
    /** 根据角色ID查询菜单树结构 */
    // async getRoleMenuTreeselect(roleId) {
    //   return getMenuListByRoleId({roleId: roleId}).then(response => {
    //     this.menuOptions = response.data;
    //     console.log(response)
    //     return response.data;
    //   });
    // },

    //获取角色的选择的菜单权限 async
    async getRoleMenuTreeSelected(roleId) {
      return getMenuTreeSelectedByRoleId({ roleId: roleId }).then(response => {
        this.menuOptions = response.data.menus;
        this.menuSelectedOptions = response.data.checkedKeys;
        // console.log(response.data);
        return response.data
      }).catch(error => {
        this.msgError(error.message)
        console.log(error.message)
      })
    },

    /** 根据角色ID查询部门树结构 */
    // getRoleDeptTreeselect(roleId) {
    //   return roleDeptTreeselect(roleId).then(response => {
    //     this.deptOptions = response.depts;
    //     return response;
    //   });
    // },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        let dataForm = { roleId: row.roleId, status: row.status }
        return changeRoleStatus(dataForm);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.roleOfMenu != undefined) {
        this.$refs.roleOfMenu.setCheckedKeys([]);
      }
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.menuExpand = false,
        this.menuNodeAll = false,
        // this.deptExpand = true,
        // this.deptNodeAll = false,
        this.menuCheckStrictly = false,
        // this.deptCheckStrictly: true,
        this.form = {
          roleId: undefined,
          roleName: undefined,
          roleKey: undefined,
          roleSort: 0,
          status: "0",
          menuIds: [],
          deptIds: [],
          remark: undefined
        };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.roleId)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    // 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == 'roleOfMenu') {
        let treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.roleOfMenu.store.nodesMap[treeList[i].menuId].expanded = value;
        }
      } else if (type == 'menu') {
        let treeList = this.menuOptions;
        for (let i = 0; i < treeList.length; i++) {
          this.$refs.menu.store.nodesMap[treeList[i].menuId].expanded = value;
        }
      }
      // else if (type == 'dept') {
      //   let treeList = this.deptOptions;
      //   for (let i = 0; i < treeList.length; i++) {
      //     this.$refs.dept.store.nodesMap[treeList[i].id].expanded = value;
      //   }
      // }
    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == 'roleOfMenu') {
        this.$refs.roleOfMenu.setCheckedNodes(value ? this.menuOptions : []);
      } else if (type == 'menu') {
        this.$refs.menu.setCheckedNodes(value ? this.menuOptions : []);
      }
      // else if (type == 'dept') {
      //   this.$refs.dept.setCheckedNodes(value ? this.deptOptions: []);
      // }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      if (type == 'menu') {
        this.menuCheckStrictly = value ? true : false;
      }
      // else if (type == 'dept') {
      //   this.deptCheckStrictly = value ? true: false;
      // }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getMenuTreeselect();
      this.open = true;
      this.title = "添加角色";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const roleId = row.roleId || this.ids[0]
      const roleMenu = this.getRoleMenuTreeSelected(roleId);
      //this.getRoleMenuTreeSelected(row.roleId);
      // console.log(roleMenu)
      getRole({ roleId: roleId }).then(response => {
        this.form = response.data;
        this.open = true;
        // setTimeout(()=>{
        //   this.$nextTick(() => {
        //     roleMenu.then(res => {
        //       this.$refs.roleOfMenu.setCheckedKeys(res.checkedKeys);
        //     });
        //   });
        // },400)
        this.title = "修改角色";
      });
    },
    /** 分配数据权限操作 */
    handleMenuDataScope(row) {
      this.reset();
      // const roleDeptTreeselect = this.getRoleDeptTreeselect(row.roleId);
      // this.getRoleMenuTreeSelected(row.roleId);
      const roleMenu = this.getRoleMenuTreeSelected(row.roleId);
      getRole({ roleId: row.roleId }).then(response => {
        this.form = response.data;
        this.openDataScope = true;
        this.$nextTick(() => {
          roleMenu.then(res => {
            this.$refs.menu.setCheckedKeys(res.checkedKeys);
          });
        });
        this.title = "分配数据权限";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            // this.form.menuIds = this.getMenuAllCheckedKeys();
            // var menuIds = this.getMenuAllCheckedKeys();
            // console.log(menuIds);
            updateRole(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // this.form.menuIds = this.getMenuAllCheckedKeys();
            addRole(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 提交按钮（数据权限） */
    submitMenuDataScope: function () {
      if (this.form.roleId != undefined) {
        if (this.form.dataScope == 1) {
          getAllMenuIdList().then(res => {
            let menuIdList = res.data;
            this.addAndRemoveRoleMenu(menuIdList);
          })
        } else {
          //this.form.deptIds.menuSelectedOptionsMenuAllCheckedKeys();
          var menuIds = this.getMenuAllCheckedKeys();
          this.addAndRemoveRoleMenu(menuIds);
        }
      }
    },
    addAndRemoveRoleMenu(menuIds) {
      //通过两个数组的比较差值，以数据库中的为基准查询比较差值为删除的数据
      let deleteMenuIds = this.menuSelectedOptions.filter(item => !menuIds.includes(item));
      //通过两个数组的比较差值，以表单中的为基准查询比较差值为添加的数据
      let addMenuIds = menuIds.filter(item => !this.menuSelectedOptions.includes(item));
      //大于0，开始执行删除
      if (deleteMenuIds.length > 0) {
        var deleteRoleMenuList = this.buildRoleMenuList(this.form.roleId, deleteMenuIds);
        // console.log(deleteRoleMenuList);
        batchDeleteRoleMenus(deleteRoleMenuList).then(response => {
          this.msgSuccess("回收菜单权限"+response.msg);
          this.openDataScope = false;
          this.getList();
        });
      }
      //大于0，开始执行添加
      if (addMenuIds.length > 0) {
        var addRoleMenuList = this.buildRoleMenuList(this.form.roleId, addMenuIds);
        // console.log(addRoleMenuList);
        batchAddRoleMenus(addRoleMenuList).then(response => {
          this.msgSuccess("添加菜单权限"+response.msg);
          this.openDataScope = false;
          this.getList();
        });
      }
    },

    changeMenuDataScope(value) {
    },

    //构建要添加的角色菜单权限列表
    buildRoleMenuList(roleId, menuIdList) {
      var roleMenuList = new Array();
      //let menuIdListTemp=menuIdList;
      menuIdList.forEach((res => {
        roleMenuList.push({ roleId: roleId, menuId: res });
      }))
      return roleMenuList
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delRole(roleIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有角色数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportRole(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
